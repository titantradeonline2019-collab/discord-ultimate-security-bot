import discord
from discord.ext import commands

class Protection30(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot30')
    @commands.has_permissions(administrator=True)
    async def protection_30(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 30 ACTIVE", color=discord.Color.green())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection30(bot))
