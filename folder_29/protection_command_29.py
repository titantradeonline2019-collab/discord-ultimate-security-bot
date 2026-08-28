import discord
from discord.ext import commands

class Protection29(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot29')
    @commands.has_permissions(administrator=True)
    async def protection_29(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 29 ACTIVE", color=discord.Color.blue())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection29(bot))
