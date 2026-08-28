"""
Folder 2 - Anti Raid Advanced Protection v2
"""
import discord
from discord.ext import commands
from datetime import datetime, timedelta
from collections import defaultdict

class AntiRaid2(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.join_track = defaultdict(list)
    
    @commands.command(name='antiraid2')
    @commands.has_permissions(administrator=True)
    async def anti_raid_v2(self, ctx):
        """🛡️ Anti Raid Protection v2 - Advanced"""
        embed = discord.Embed(
            title="🛡️ ANTI RAID v2 ACTIVATED",
            description="Advanced raid detection enabled!",
            color=discord.Color.red()
        )
        await ctx.send(embed=embed)
    
    @commands.Cog.listener()
    async def on_member_join(self, member):
        guild_id = member.guild.id
        self.join_track[guild_id].append(datetime.now())
        
        self.join_track[guild_id] = [
            t for t in self.join_track[guild_id]
            if datetime.now() - t < timedelta(minutes=1)
        ]
        
        if len(self.join_track[guild_id]) > 15:
            try:
                await member.ban(reason="Raid protection v2")
            except:
                pass

async def setup(bot):
    await bot.add_cog(AntiRaid2(bot))
