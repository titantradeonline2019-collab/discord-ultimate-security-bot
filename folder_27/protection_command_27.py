import discord
from discord.ext import commands

class Protection27(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot27')
    @commands.has_permissions(administrator=True)
    async def protection_27(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 27 ACTIVE", color=discord.Color.nitro_pink())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection27(bot))
