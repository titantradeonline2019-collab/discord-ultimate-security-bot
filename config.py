"""
Configuration settings for Discord Ultimate Security Bot
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Bot Token
BOT_TOKEN = os.getenv('DISCORD_BOT_TOKEN')

# Protection Settings
PROTECTION_CONFIG = {
    # Spam Protection
    'spam': {
        'enabled': True,
        'max_messages_per_minute': 5,
        'action': 'mute',
        'mute_duration': 300
    },
    
    # Bot Protection
    'bot_protection': {
        'enabled': True,
        'allow_verified_bots': True,
        'block_suspicious_bots': True,
    },
    
    # Member Verification
    'verification': {
        'enabled': True,
        'require_verification': True,
        'verification_role': None,
    },
    
    # Raid Protection
    'raid_protection': {
        'enabled': True,
        'members_per_minute': 10,
        'action': 'ban'
    },
    
    # Links Protection
    'links_protection': {
        'enabled': True,
        'block_invite_links': True,
        'block_external_links': False,
    },
    
    # Mass Mentions
    'mass_mentions': {
        'enabled': True,
        'max_mentions': 5,
        'action': 'mute'
    },
    
    # Caps Lock
    'caps_lock': {
        'enabled': True,
        'max_caps_percentage': 70,
        'action': 'warn'
    },
    
    # Profanity
    'profanity': {
        'enabled': True,
        'action': 'delete',
    },
    
    # Channel Protection
    'channel_protection': {
        'enabled': True,
        'protect_channels': True,
        'protect_roles': True,
    }
}

# Moderation
MODERATION_CONFIG = {
    'auto_mod': True,
    'log_channel_name': 'security-logs',
    'mod_log_channel_name': 'mod-logs',
}

# Server Lock
SERVER_LOCK_CONFIG = {
    'default_role': None,
    'lock_duration': None,
}
