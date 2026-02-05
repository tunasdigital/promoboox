import { createClient } from 'redis';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Conexão direta com a URL que você encontrou
  const client = createClient({
    url: 'redis://default:c8ncCrhp5sFREFnppaiJFeig4ImwzRVj@redis-11679.crce207.sa-east-1-2.ec2.cloud.redislabs.com:11679'
  });

  try {
    const body = await request.json();
    const id = Date.now().toString();
    const newOffer = { ...body, id, clicks: 0 };

    await client.connect();

    // Busca ofertas existentes
    const existingData = await client.get('promoboox_offers');
    const offers = existingData ? JSON.parse(existingData) : [];
    
    // Salva a nova lista
    await client.set('promoboox_offers', JSON.stringify([newOffer, ...offers]));
    
    await client.disconnect();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("ERRO REDIS:", error);
    if (client.isOpen) await client.disconnect();
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const client = createClient({
    url: 'redis://default:c8ncCrhp5sFREFnppaiJFeig4ImwzRVj@redis-11679.crce207.sa-east-1-2.ec2.cloud.redislabs.com:11679'
  });

  try {
    await client.connect();
    const data = await client.get('promoboox_offers');
    await client.disconnect();
    return NextResponse.json(data ? JSON.parse(data) : []);
  } catch (error) {
    if (client.isOpen) await client.disconnect();
    return NextResponse.json([]);
  }
}