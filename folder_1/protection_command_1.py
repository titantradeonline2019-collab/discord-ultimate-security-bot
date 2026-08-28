"""
Folder 1 - Anti Spam Advanced Protection v1
"""
import discord
from discord.ext import commands
from datetime import datetime, timedelta
from collections import defaultdict

class AntiSpam1(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.spam_track = defaultdict(list)
    
    @commands.command(name='antispam1')
    @commands.has_permissions(administrator=True)
    async def anti_spam_v1(self, ctx):
        """🚫 Anti Spam Protection v1 - Advanced"""
        embed = discord.Embed(
            title="🚫 ANTI SPAM v1 ACTIVATED",
            description="Advanced spam detection enabled!",
            color=discord.Color.red()
        )
        await ctx.send(embed=embed)
    
    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author == self.bot.user:
            return
        
        user_id = message.author.id
        self.spam_track[user_id].append(datetime.now())
        
        # Clean old entries
        self.spam_track[user_id] = [
            t for t in self.spam_track[user_id]
            if datetime.now() - t < timedelta(seconds=10)
        ]
        
        if len(self.spam_track[user_id]) > 10:
            try:
                await message.delete()
            except:
                pass

async def setup(bot):
    await bot.add_cog(AntiSpam1(bot))
