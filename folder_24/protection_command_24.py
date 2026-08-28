import discord
from discord.ext import commands

class Protection24(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot24')
    @commands.has_permissions(administrator=True)
    async def protection_24(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 24 ACTIVE", color=discord.Color.greyple())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection24(bot))
