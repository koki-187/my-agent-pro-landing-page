export default async function handler(req, res) {
  // CORS設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, plan, message } = req.body;

    // 必須フィールドのバリデーション
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: '必須フィールドが入力されていません。' 
      });
    }

    // メールアドレスの簡単なバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: '有効なメールアドレスを入力してください。' 
      });
    }

    // 実際のメール送信処理（開発環境では省略）
    console.log('お問い合わせフォーム送信:', {
      name,
      email,
      phone,
      plan,
      message,
      timestamp: new Date().toISOString(),
      to: 'info@my-agent.work'
    });

    // 成功レスポンス
    res.status(200).json({ 
      message: 'お問い合わせを受け付けました。担当者より連絡いたします。' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'サーバーエラーが発生しました。しばらく後でもう一度お試しください。' 
    });
  }
}

