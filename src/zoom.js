import zoomSdk from "@zoom/appssdk";

export async function initZoom() {
  try {
    await zoomSdk.config({
      version: "0.16.0", // 必ず最新に
    });

    const auth = await zoomSdk.connect();
    console.log("✅ Zoom connected:", auth);

  } catch (e) {
    console.error("❌ Zoom init failed:", e);
  }
}
