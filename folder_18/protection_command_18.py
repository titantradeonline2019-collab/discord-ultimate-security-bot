import discord
from discord.ext import commands

class Protection18(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot18')
    @commands.has_permissions(administrator=True)
    async def protection_18(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 18 ACTIVE", color=discord.Color.magenta())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection18(bot))
