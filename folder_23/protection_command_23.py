import discord
from discord.ext import commands

class Protection23(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot23')
    @commands.has_permissions(administrator=True)
    async def protection_23(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 23 ACTIVE", color=discord.Color.darker_gray())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection23(bot))
