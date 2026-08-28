import discord
from discord.ext import commands

class Protection28(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot28')
    @commands.has_permissions(administrator=True)
    async def protection_28(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 28 ACTIVE", color=discord.Color.red())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection28(bot))
