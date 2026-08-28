import discord
from discord.ext import commands

class Protection22(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot22')
    @commands.has_permissions(administrator=True)
    async def protection_22(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 22 ACTIVE", color=discord.Color.light_gray())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection22(bot))
