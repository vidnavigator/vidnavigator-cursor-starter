#!/usr/bin/env node
/**
 * VidNavigator MCP Server for Claude Desktop Extensions
 * 
 * This is a Node.js implementation of the VidNavigator MCP server
 * that calls the VidNavigator Developer API v1 endpoints.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';


// Configuration
const API_BASE_URL = 'https://api.vidnavigator.com/v1'; // Controlled by VidNavigator team
const API_KEY = process.env.API_KEY;
const API_TIMEOUT = 30000; // 30 seconds

class VidNavigatorServer {
  constructor() {
    this.server = new Server(
      {
        name: 'vidnavigator',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search_videos',
            description: 'Search for videos using advanced AI analysis with prompt engineering, content analysis, and relevance ranking',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Natural language search query for videos'
                },
                start_year: {
                  type: 'integer',
                  description: 'Optional start year for filtering results'
                },
                end_year: {
                  type: 'integer',
                  description: 'Optional end year for filtering results'
                },
                focus: {
                  type: 'string',
                  enum: ['relevance', 'popularity', 'brevity'],
                  description: 'Focus of search results',
                  default: 'relevance'
                },
                max_results: {
                  type: 'integer',
                  description: 'Maximum number of results to return (note: API uses default limit)',
                  minimum: 1,
                  maximum: 10,
                  default: 5
                }
              },
              required: ['query'],
              additionalProperties: false
            }
          },
          {
            name: 'analyze_video',
            description: 'Analyze a video\'s content and generate summary, extract key information',
            inputSchema: {
              type: 'object',
              properties: {
                video_url: {
                  type: 'string',
                  description: 'YouTube video URL to analyze'
                },
                analysis_type: {
                  type: 'string',
                  enum: ['summary', 'question'],
                  description: 'Type of analysis to perform',
                  default: 'summary'
                },
                question: {
                  type: 'string',
                  description: 'Specific question to answer about the video (if analysis_type is \'question\')'
                }
              },
              required: ['video_url'],
              additionalProperties: false
            }
          },
          {
            name: 'get_video_transcript',
            description: 'Get the transcript for a specific video without AI analysis',
            inputSchema: {
              type: 'object',
              properties: {
                video_url: {
                  type: 'string',
                  description: 'YouTube video URL to get transcript for'
                }
              },
              required: ['video_url'],
              additionalProperties: false
            }
          },
          {
            name: 'answer_followup_question',
            description: 'Answer a follow-up question about a previously analyzed video',
            inputSchema: {
              type: 'object',
              properties: {
                video_url: {
                  type: 'string',
                  description: 'YouTube video URL that was previously analyzed'
                },
                question: {
                  type: 'string',
                  description: 'Follow-up question about the video'
                }
              },
              required: ['video_url', 'question'],
              additionalProperties: false
            }
          },
          {
            name: 'get_usage',
            description: 'Get current usage statistics including API calls, storage usage, and subscription limits',
            inputSchema: {
              type: 'object',
              properties: {},
              required: [],
              additionalProperties: false
            }
          },
          {
            name: 'transcribe_video',
            description: 'Transcribe non-YouTube videos (Instagram, TikTok, Facebook, etc.)',
            inputSchema: {
              type: 'object',
              properties: {
                video_url: {
                  type: 'string',
                  description: 'URL of the video to transcribe (Instagram, TikTok, Facebook, etc.)'
                },
                language: {
                  type: 'string',
                  description: 'Optional ISO2 language code (en, fr, es, etc.)',
                  default: 'en'
                }
              },
              required: ['video_url'],
              additionalProperties: false
            }
          }
        ]
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (!API_KEY) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          'API key required. Please configure your VidNavigator API key in the extension settings.'
        );
      }

      try {
        switch (name) {
          case 'search_videos':
            return await this.handleSearchVideos(args);
          case 'analyze_video':
            return await this.handleAnalyzeVideo(args);
          case 'get_video_transcript':
            return await this.handleGetVideoTranscript(args);
          case 'answer_followup_question':
            return await this.handleAnswerFollowupQuestion(args);
          case 'get_usage':
            return await this.handleGetUsage(args);
          case 'transcribe_video':
            return await this.handleTranscribeVideo(args);
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing tool ${name}: ${error.message}`
        );
      }
    });
  }

  async callApiEndpoint(endpoint, data = null, method = 'POST') {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'VidNavigator-MCP-Desktop/1.0.0'
      },
      signal: AbortSignal.timeout(API_TIMEOUT)
    };

    if (method === 'POST' && data) {
      options.body = JSON.stringify(data);
    }

    console.error(`[API] Making ${method} request to ${endpoint}`);

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API call failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.error(`[API] Request successful: ${endpoint}`);
      return result;
    } catch (error) {
      if (error.name === 'TimeoutError') {
        throw new Error('API request timed out');
      }
      throw error;
    }
  }

  transformSearchResponse(apiResponse, query, filters) {
    const data = apiResponse.data || {};
    return {
      status: 'success',
      results: data.results || [],
      count: data.total_found || 0,
      explanation: data.explanation || '',
      query: data.query || query,
      filters_applied: filters,
      note: 'Results include AI analysis, content scoring, and relevance ranking'
    };
  }

  transformAnalyzeResponse(apiResponse) {
    const data = apiResponse.data || {};
    const videoInfo = data.video_info || {};
    const analysis = data.transcript_analysis || {};

    return {
      status: 'success',
      video_info: {
        title: videoInfo.title || '',
        channel: videoInfo.channel || '',
        duration: videoInfo.duration || '',
        url: videoInfo.url || ''
      },
      analysis: {
        summary: analysis.summary || '',
        people: analysis.people || [],
        places: analysis.places || [],
        key_subjects: analysis.key_subjects || [],
        timestamp: analysis.timestamp,
        relevant_transcript: analysis.relevant_text || ''
      }
    };
  }

  transformTranscriptResponse(apiResponse) {
    const data = apiResponse.data || {};
    return {
      status: 'success',
      video_url: data.video_url || '',
      title: data.title || '',
      channel: data.channel || '',
      duration: data.duration || '',
      transcript: data.transcript || [],
      segment_count: (data.transcript || []).length
    };
  }

  async handleSearchVideos(args) {
    const { query, start_year, end_year, focus = 'relevance' } = args;

    const apiResponse = await this.callApiEndpoint('/search/video', {
      query,
      start_year,
      end_year,
      focus
    });

    const filters = { start_year, end_year, focus };
    const result = this.transformSearchResponse(apiResponse, query, filters);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleAnalyzeVideo(args) {
    const { video_url, analysis_type = 'summary', question } = args;

    const apiData = { video_url };
    if (analysis_type === 'question' && question) {
      apiData.query = question;
    }

    const apiResponse = await this.callApiEndpoint('/analyze/video', apiData);
    const result = this.transformAnalyzeResponse(apiResponse);

    // Add query answer if present
    const analysis = apiResponse.data?.transcript_analysis || {};
    if (analysis.query_answer) {
      result.analysis.query_answer = analysis.query_answer;
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetVideoTranscript(args) {
    const { video_url } = args;

    const apiResponse = await this.callApiEndpoint('/transcript', { video_url });
    const result = this.transformTranscriptResponse(apiResponse);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleAnswerFollowupQuestion(args) {
    const { video_url, question } = args;

    const apiResponse = await this.callApiEndpoint('/analyze/video', {
      video_url,
      query: question
    });

    const result = this.transformAnalyzeResponse(apiResponse);

    // Add question-specific fields
    const analysis = apiResponse.data?.transcript_analysis || {};
    if (analysis.query_answer) {
      result.question = question;
      result.answer = analysis.query_answer.answer || analysis.summary || '';
      result.best_segment_index = analysis.query_answer.best_segment_index;
      result.relevant_segments = analysis.query_answer.relevant_segments;
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetUsage(args) {
    const apiResponse = await this.callApiEndpoint('/usage', null, 'GET');

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(apiResponse, null, 2)
        }
      ]
    };
  }

  async handleTranscribeVideo(args) {
    const { video_url, language = 'en' } = args;

    const apiResponse = await this.callApiEndpoint('/transcribe', {
      video_url,
      language
    });

    const result = {
      status: 'success',
      video_url,
      transcript: apiResponse.data?.transcript || [],
      segment_count: (apiResponse.data?.transcript || []).length
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }



  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('VidNavigator MCP server running on stdio');
  }
}

const server = new VidNavigatorServer();
server.run().catch(console.error);