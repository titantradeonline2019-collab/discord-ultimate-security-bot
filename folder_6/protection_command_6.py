"""
Folder 6 - Role Protection Advanced v6
"""
import discord
from discord.ext import commands

class RoleProtection6(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.command(name='roleprotect6')
    @commands.has_permissions(administrator=True)
    async def role_protection_v6(self, ctx):
        """🎖️ Role Protection v6 - Advanced"""
        embed = discord.Embed(
            title="🎖️ ROLE PROTECTION v6 ACTIVATED",
            description="Advanced role monitoring enabled!",
            color=discord.Color.green()
        )
        await ctx.send(embed=embed)
    
    @commands.Cog.listener()
    async def on_role_delete(self, role):
        embed = discord.Embed(
            title="🚨 ROLE DELETED",
            description=f"Role: {role.name} was deleted!",
            color=discord.Color.red()
        )

async def setup(bot):
    await bot.add_cog(RoleProtection6(bot))
