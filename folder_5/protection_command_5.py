"""
Folder 5 - Mention Spam Advanced v5
"""
import discord
from discord.ext import commands

class MentionSpam5(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='mentionspam5')
    @commands.has_permissions(administrator=True)
    async def mention_spam_v5(self, ctx):
        """📍 Mention Spam Protection v5 - Advanced"""
        embed = discord.Embed(
            title="📍 MENTION SPAM v5 ACTIVATED",
            description="Advanced mention detection enabled!",
            color=discord.Color.orange()
        )
        await ctx.send(embed=embed)
    
    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author == self.bot.user:
            return
        
        if len(message.mentions) > 8:
            await message.delete()

async def setup(bot):
    await bot.add_cog(MentionSpam5(bot))
