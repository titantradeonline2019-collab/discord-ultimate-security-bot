import discord
from discord.ext import commands

class Protection17(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot17')
    @commands.has_permissions(administrator=True)
    async def protection_17(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 17 ACTIVE", color=discord.Color.teal())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection17(bot))
