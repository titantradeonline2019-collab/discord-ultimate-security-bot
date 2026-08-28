import discord
from discord.ext import commands

class Protection16(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='prot16')
    @commands.has_permissions(administrator=True)
    async def protection_16(self, ctx):
        embed = discord.Embed(title="🛡️ Protection 16 ACTIVE", color=discord.Color.gold())
        await ctx.send(embed=embed)

async def setup(bot):
    await bot.add_cog(Protection16(bot))
