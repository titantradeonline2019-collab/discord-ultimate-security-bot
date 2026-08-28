"""
Folder 4 - Profanity Filter Advanced v4
"""
import discord
from discord.ext import commands

class ProfanityFilter4(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='profanity4')
    @commands.has_permissions(administrator=True)
    async def profanity_filter_v4(self, ctx):
        """🔞 Profanity Filter v4 - Advanced"""
        embed = discord.Embed(
            title="🔞 PROFANITY FILTER v4 ACTIVATED",
            description="Advanced profanity detection enabled!",
            color=discord.Color.purple()
        )
        await ctx.send(embed=embed)
    
    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author == self.bot.user:
            return
        
        bad_words = ['badword1', 'badword2', 'badword3']
        if any(word in message.content.lower() for word in bad_words):
            await message.delete()

async def setup(bot):
    await bot.add_cog(ProfanityFilter4(bot))
