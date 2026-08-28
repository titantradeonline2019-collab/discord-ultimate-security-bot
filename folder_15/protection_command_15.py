import discord
from discord.ext import commands

class Protection15(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot15')
    @commands.has_permissions(administrator=True)
    async def protection_15(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 15 ACTIVE", color=discord.Color.orange())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection15(bot))
