import discord
from discord.ext import commands

class Protection13(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot13')
    @commands.has_permissions(administrator=True)
    async def protection_13(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 13 ACTIVE", color=discord.Color.green())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection13(bot))
