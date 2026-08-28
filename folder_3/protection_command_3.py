"""
Folder 3 - Link Scanner Advanced Protection v3
"""
import discord
from discord.ext import commands
import re

class LinkScanner3(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='linkscanner3')
    @commands.has_permissions(administrator=True)
    async def link_scanner_v3(self, ctx):
        """🔗 Link Scanner Protection v3 - Advanced"""
        embed = discord.Embed(
            title="🔗 LINK SCANNER v3 ACTIVATED",
            description="Advanced link detection enabled!",
            color=discord.Color.blue()
        )
        await ctx.send(embed=embed)
    
    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author == self.bot.user:
            return
        
        # Detect URLs
        url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
        if re.search(url_pattern, message.content):
            await message.delete()

async def setup(bot):
    await bot.add_cog(LinkScanner3(bot))
