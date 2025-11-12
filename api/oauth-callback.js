export default async function handler(req, res) {
  try {
    const code = req.query.code;

    // Zoomからリダイレクトされたときにcodeが無い場合
    if (!code) {
      return res.status(400).send("Missing authorization code");
    }

    // 環境変数チェック
    if (!process.env.ZOOM_CLIENT_ID || !process.env.ZOOM_CLIENT_SECRET || !process.env.ZOOM_REDIRECT_URI) {
      return res.status(500).send("Missing environment variables");
    }

    // Zoomトークン取得
    const tokenResponse = await fetch("https://zoom.us/oauth/token", {
      method: "POST",
      headers: {
        "Authorization":
          "Basic " +
          Buffer.from(
            `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.ZOOM_REDIRECT_URI,
      }),
    });

    // レスポンスチェック
    if (!tokenResponse.ok) {
      const text = await tokenResponse.text();
      console.error("Zoom token request failed:", text);
      return res.status(500).send("Zoom token request failed: " + text);
    }

    const data = await tokenResponse.json();
    console.log("Access Token Response:", data);

    // 成功メッセージを返す
    return res.status(200).json({
      message: "Zoom OAuth connected successfully!",
      tokenData: data,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).send("Internal Server Error: " + error.message);
  }
}
