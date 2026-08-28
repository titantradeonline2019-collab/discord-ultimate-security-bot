import discord
from discord.ext import commands

class Protection20(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot20')
    @commands.has_permissions(administrator=True)
    async def protection_20(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 20 ACTIVE", color=discord.Color.dark_blue())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection20(bot))
