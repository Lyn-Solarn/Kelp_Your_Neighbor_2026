export async function saveOtterAvatarToSupabase({
  supabase,
  userId,
  pngBlob,
  bucket = "avatars",
  table = "user",
  urlColumn = "avatar_url"
}) {
  const filePath = `${userId}/otter-profile-${Date.now()}.png`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, pngBlob, {
      contentType: "image/png",
      upsert: true
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

  const avatarUrl = publicUrlData.publicUrl;

  const { error: updateError } = await supabase
    .from(table)
    .update({ [urlColumn]: avatarUrl })
    .eq("id", userId);

  if (updateError) {
    throw updateError;
  }

  return { avatarUrl, filePath };
}
