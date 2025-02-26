const chatbot = {
    // Knowledge base for each CDP
    knowledge: {
        segment: {
            sources: {
                setup: "To set up a new source in Segment:\n1. Log in to your Segment workspace\n2. Go to Connections > Sources\n3. Click 'Add Source'\n4. Search for your desired source type\n5. Name your source and click 'Add Source'\n6. Follow the configuration steps specific to your source type\n7. Enable the source when configuration is complete",
                list: "Common Segment sources include:\n- Analytics.js for websites\n- Mobile SDKs (iOS, Android)\n- Server-side SDKs\n- Cloud Apps\n- Database imports",
                manage: "To manage existing sources:\n1. Go to Sources in your workspace\n2. Click on the source you want to manage\n3. You can modify settings, check debug mode, or view events"
            },
            destinations: {
                setup: "To add a destination in Segment:\n1. Go to Connections > Destinations\n2. Click 'Add Destination'\n3. Search and select your destination\n4. Choose the source to connect\n5. Configure the destination settings\n6. Enable the destination",
                manage: "To manage destinations in Segment:\n1. Access your workspace\n2. Navigate to Destinations\n3. Select the destination to manage\n4. Update settings or mappings"
            },
            tracking: {
                setup: "Setting up tracking in Segment:\n1. Choose your source type (Web, Mobile, Server)\n2. Install the appropriate SDK\n3. Initialize the SDK with your write key\n4. Implement tracking calls (identify, track, page)\n5. Verify events in the Segment debugger",
                events: "Common Segment tracking methods:\n- identify(): For user identification\n- track(): For custom events\n- page(): For page views\n- group(): For group/company tracking\n- alias(): For user aliasing"
            },
            advanced: {
                config: "Advanced Segment configurations:\n1. Setting up tracking plan\n2. Implementing middleware\n3. Custom source functions\n4. Data transformation\n5. Privacy controls",
                debug: "Debugging in Segment:\n1. Use the Segment debugger\n2. Check live event stream\n3. Validate schema\n4. Monitor data quality\n5. Test integrations"
            }
        },
        mparticle: {
            profile: {
                create: "To create user profiles in mParticle:\n1. Access the Audience Builder\n2. Click 'Create New Profile'\n3. Define user attributes and behaviors\n4. Set up identity matching rules\n5. Configure profile merging settings\n6. Save and activate the profile",
                manage: "Managing profiles in mParticle:\n1. Use the Profile API\n2. Set up real-time profile updates\n3. Configure identity resolution\n4. Implement cross-device matching"
            },
            events: {
                track: "To track events in mParticle:\n1. Implement the mParticle SDK\n2. Use the track() method\n3. Define event attributes\n4. Set up custom event mapping\n5. Verify in Live Stream"
            }
        },
        lytics: {
            audience: {
                create: "Creating audiences in Lytics:\n1. Navigate to Audience > Create New\n2. Define audience criteria:\n   - Behavioral signals\n   - User attributes\n   - Custom events\n3. Set audience rules and conditions\n4. Preview audience size\n5. Save and activate",
                manage: "Managing Lytics audiences:\n1. Access Audience dashboard\n2. Monitor audience growth\n3. Update audience rules\n4. Export audience data\n5. Set up automation"
            },
            integration: {
                setup: "Setting up Lytics integrations:\n1. Go to Integrations menu\n2. Select integration type\n3. Configure authentication\n4. Map data fields\n5. Test connection\n6. Enable real-time sync"
            }
        },
        zeotap: {
            data: {
                integrate: "Integrating data with Zeotap:\n1. Access Data Integration section\n2. Choose integration method:\n   - API integration\n   - Batch upload\n   - Real-time streaming\n3. Configure data mapping\n4. Set up identity resolution\n5. Test and validate\n6. Monitor data flow",
                manage: "Managing data in Zeotap:\n1. Use Data Manager interface\n2. Set up data validation rules\n3. Configure privacy settings\n4. Monitor data quality\n5. Set up automated workflows"
            },
            identity: {
                setup: "Setting up Zeotap Identity:\n1. Configure identity sources\n2. Set up matching rules\n3. Define identity resolution logic\n4. Test identity matching\n5. Monitor match rates"
            }
        }
    },

    // Add comparison knowledge
    comparisons: {
        audience: {
            "segment-lytics": "Comparing Segment vs Lytics audience creation:\n\nSegment:\n- Uses SQL-like syntax for audience creation\n- Focuses on event-based segmentation\n- Real-time audience updates\n- Better for behavioral targeting\n\nLytics:\n- Visual audience builder\n- Advanced ML-powered segmentation\n- Predictive scoring capabilities\n- Better for content affinity",
            "segment-mparticle": "Comparing Segment vs mParticle audience creation:\n\nSegment:\n- Event-based segmentation\n- Simple SQL-like syntax\n- Good for basic behavioral targeting\n\nmParticle:\n- Advanced audience rules\n- Cross-device user profiles\n- Real-time audience updates\n- Better identity resolution",
            "lytics-mparticle": "Comparing Lytics vs mParticle audience creation:\n\nLytics:\n- ML-powered segmentation\n- Content affinity scoring\n- Behavioral predictions\n\nmParticle:\n- Rule-based segmentation\n- Cross-device profiles\n- Real-time updates",
        },
        integration: {
            "segment-zeotap": "Comparing Segment vs Zeotap integration:\n\nSegment:\n- Wide range of source/destination options\n- Simple configuration process\n- JavaScript-based tracking\n\nZeotap:\n- Focus on identity resolution\n- Better data enrichment\n- Advanced privacy controls",
        }
    },

    getResponse(message, platform) {
        const normalizedMessage = message.toLowerCase();

        // Check for comparison questions
        if (normalizedMessage.includes('compare') || normalizedMessage.includes('difference') || normalizedMessage.includes('vs')) {
            const platforms = ['segment', 'mparticle', 'lytics', 'zeotap'];
            const mentionedPlatforms = platforms.filter(p => normalizedMessage.includes(p));

            if (mentionedPlatforms.length === 2) {
                const comparisonKey = mentionedPlatforms.sort().join('-');
                
                if (normalizedMessage.includes('audience') || normalizedMessage.includes('segment')) {
                    return this.comparisons.audience[comparisonKey] || 
                           "I can't make that specific comparison, but I can tell you about each platform individually.";
                }
                
                if (normalizedMessage.includes('integrate') || normalizedMessage.includes('integration')) {
                    return this.comparisons.integration[comparisonKey] ||
                           "I can't make that specific comparison, but I can tell you about each platform individually.";
                }
            }
        }

        // Check for clear chat command
        if (normalizedMessage === 'clear chat') {
            return null;
        }

        // Extract keywords from message
        const keywords = {
            setup: normalizedMessage.includes('set up') || normalizedMessage.includes('setup') || 
                   normalizedMessage.includes('create') || normalizedMessage.includes('how to'),
            source: normalizedMessage.includes('source'),
            profile: normalizedMessage.includes('profile'),
            audience: normalizedMessage.includes('audience') || normalizedMessage.includes('segment'),
            integrate: normalizedMessage.includes('integrate') || normalizedMessage.includes('integration'),
            data: normalizedMessage.includes('data'),
            identity: normalizedMessage.includes('identity'),
            manage: normalizedMessage.includes('manage') || normalizedMessage.includes('monitoring'),
            advanced: normalizedMessage.includes('advanced') || normalizedMessage.includes('complex'),
            tracking: normalizedMessage.includes('track') || normalizedMessage.includes('event'),
            destination: normalizedMessage.includes('destination'),
            debug: normalizedMessage.includes('debug') || normalizedMessage.includes('test')
        };

        // Get platform-specific responses
        switch (platform) {
            case 'segment':
                if (keywords.setup || keywords.create) {
                    if (keywords.source) {
                        return this.knowledge.segment.sources.setup;
                    } else if (keywords.destination) {
                        return this.knowledge.segment.destinations.setup;
                    } else if (keywords.tracking) {
                        return this.knowledge.segment.tracking.setup;
                    }
                } 
                else if (keywords.source) {
                    return keywords.manage ? 
                        this.knowledge.segment.sources.manage :
                        this.knowledge.segment.sources.list;
                }
                else if (keywords.destination) {
                    return keywords.manage ?
                        this.knowledge.segment.destinations.manage :
                        this.knowledge.segment.destinations.setup;
                }
                else if (keywords.tracking || keywords.events) {
                    return this.knowledge.segment.tracking.events;
                }
                else if (keywords.advanced) {
                    return keywords.debug ?
                        this.knowledge.segment.advanced.debug :
                        this.knowledge.segment.advanced.config;
                }
                break;

            case 'mparticle':
                if (keywords.setup && keywords.profile) {
                    return this.knowledge.mparticle.profile.create;
                } else if (keywords.manage && keywords.profile) {
                    return this.knowledge.mparticle.profile.manage;
                } else if (keywords.setup || keywords.integrate) {
                    return this.knowledge.mparticle.events.track;
                }
                break;

            case 'lytics':
                if (keywords.audience || keywords.segment) {
                    return keywords.manage ? 
                        this.knowledge.lytics.audience.manage :
                        this.knowledge.lytics.audience.create;
                } else if (keywords.integrate || keywords.setup) {
                    return this.knowledge.lytics.integration.setup;
                }
                break;

            case 'zeotap':
                if (keywords.integrate || keywords.data) {
                    return keywords.manage ?
                        this.knowledge.zeotap.data.manage :
                        this.knowledge.zeotap.data.integrate;
                } else if (keywords.identity || keywords.setup) {
                    return this.knowledge.zeotap.identity.setup;
                }
                break;
        }

        // Enhanced default response
        return `I understand you're asking about ${platform}. You can ask me about:\n` +
               `- Setting up sources/destinations\n` +
               `- Creating profiles or audiences\n` +
               `- Data integration\n` +
               `- Identity management\n` +
               `- Comparing different CDPs\n` +
               `- Advanced configurations\n` +
               `- Tracking and events\n` +
               `- Debugging and testing\n\n` +
               `You can also type 'clear chat' to reset our conversation.`;
    }
}; 