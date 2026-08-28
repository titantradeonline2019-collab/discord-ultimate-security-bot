import discord
from discord.ext import commands

class Protection14(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot14')
    @commands.has_permissions(administrator=True)
    async def protection_14(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 14 ACTIVE", color=discord.Color.purple())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection14(bot))
