import discord
from discord.ext import commands

class Protection19(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot19')
    @commands.has_permissions(administrator=True)
    async def protection_19(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 19 ACTIVE", color=discord.Color.dark_red())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection19(bot))
