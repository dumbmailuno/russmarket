import { supabase, supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get('file')
  const coverImage = formData.get('cover_image')
  const name = formData.get('name')
  const description = formData.get('description')
  const price_usd = formData.get('price_usd')
  const category = formData.get('category') || 'General'

  if (!file || !name || !price_usd) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filePath = Date.now() + '_' + file.name.replace(/\s+/g, '_')

  const { error: uploadError } = await supabaseAdmin
    .storage
    .from('products')
    .upload(filePath, buffer, { contentType: file.type })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 400 })
  }

  let coverImagePath = null

  if (coverImage && coverImage.size > 0) {
    const coverBytes = await coverImage.arrayBuffer()
    const coverBuffer = Buffer.from(coverBytes)
    const coverPath = 'covers/' + Date.now() + '_' + coverImage.name.replace(/\s+/g, '_')

    const { error: coverError } = await supabaseAdmin
      .storage
      .from('products')
      .upload(coverPath, coverBuffer, { contentType: coverImage.type })

    if (!coverError) {
      const { data: urlData } = supabaseAdmin
        .storage
        .from('products')
        .getPublicUrl(coverPath)

      coverImagePath = urlData.publicUrl
    }
  }

  const { data: product, error: insertError } = await supabaseAdmin
    .from('products')
    .insert([{
      name,
      description,
      price_usd: parseFloat(price_usd),
      file_path: filePath,
      cover_image: coverImagePath,
      category
    }])
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 })
  }

  return NextResponse.json({ product }, { status: 201 })
}