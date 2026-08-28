import discord
from discord.ext import commands

class Protection21(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot21')
    @commands.has_permissions(administrator=True)
    async def protection_21(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 21 ACTIVE", color=discord.Color.dark_green())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection21(bot))
