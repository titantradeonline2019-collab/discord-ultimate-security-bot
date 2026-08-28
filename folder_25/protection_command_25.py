import discord
from discord.ext import commands

class Protection25(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot25')
    @commands.has_permissions(administrator=True)
    async def protection_25(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 25 ACTIVE", color=discord.Color.blurple())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection25(bot))
