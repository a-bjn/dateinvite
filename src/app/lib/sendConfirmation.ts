export interface ConfirmationData {
  date: string;
  time: string;
  place: string;
  placeTagline: string;
}

export async function sendConfirmation(data: ConfirmationData): Promise<void> {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Discord webhook not configured — skipping.");
    return;
  }

  const sentAt = new Date().toLocaleString("ro-RO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Invitație la întâlnire 🌸",
      avatar_url: "https://em-content.zobj.net/source/twitter/376/cherry-blossom_1f338.png",
      embeds: [
        {
          title: "A spus DA! 🌹",
          color: 0xc07840,
          fields: [
            { name: "📅 Data", value: data.date, inline: true },
            { name: "⏰ Ora", value: data.time, inline: true },
            { name: "📍 Loc", value: `**${data.place}**\n${data.placeTagline}`, inline: false },
          ],
          footer: { text: `Confirmat pe ${sentAt}` },
          thumbnail: {
            url: "https://em-content.zobj.net/source/twitter/376/bouquet_1f490.png",
          },
        },
      ],
    }),
  });
}
