"""
Discord Ultimate Security Bot - Main Entry Point
सभी 100 Protections के साथ Main Bot File
"""

import discord
from discord.ext import commands
import asyncio
from config import BOT_TOKEN

# Setup intents
intents = discord.Intents.default()
intents.message_content = True
intents.members = True
intents.guilds = True
intents.guild_messages = True
intents.dm_messages = True

# Create bot
bot = commands.Bot(command_prefix='/', intents=intents)

@bot.event
async def on_ready():
    print(f"\n{'='*50}")
    print(f"✅ BOT LOGGED IN: {bot.user}")
    print(f"{'='*50}")
    print(f"🛡️  ULTIMATE SECURITY BOT - 100/100 PROTECTIONS READY")
    print(f"📊 Servers: {len(bot.guilds)}")
    print(f"{'='*50}\n")
    
    await bot.change_presence(
        activity=discord.Activity(
            type=discord.ActivityType.watching,
            name="🛡️ /start for security"
        )
    )

@bot.event
async def on_command_error(ctx, error):
    """Handle command errors"""
    embed = discord.Embed(
        title="❌ Error",
        description=str(error),
        color=discord.Color.red()
    )
    await ctx.send(embed=embed)

async def load_cogs():
    """Load all cogs"""
    try:
        await bot.load_extension('protection')
        print("✅ 100 Protection module loaded")
    except Exception as e:
        print(f"❌ Error loading protection module: {e}")

async def main():
    """Main function"""
    async with bot:
        await load_cogs()
        await bot.start(BOT_TOKEN)

if __name__ == '__main__':
    asyncio.run(main())
