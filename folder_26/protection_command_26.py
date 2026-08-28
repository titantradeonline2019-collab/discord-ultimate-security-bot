import discord
from discord.ext import commands

class Protection26(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot26')
    @commands.has_permissions(administrator=True)
    async def protection_26(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 26 ACTIVE", color=discord.Color.brand_red())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection26(bot))
