import discord
from discord.ext import commands

class Protection12(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot12')
    @commands.has_permissions(administrator=True)
    async def protection_12(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 12 ACTIVE", color=discord.Color.blue())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection12(bot))
