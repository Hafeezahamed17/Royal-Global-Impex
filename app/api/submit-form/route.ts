import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...formData } = body

    const supabase = createClient()

    console.log(`[v0] Processing ${type} submission:`, formData)

    if (type === 'contact') {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: formData.firstName && formData.lastName 
            ? `${formData.firstName} ${formData.lastName}` 
            : formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          source: formData.source,
        },
      ])

      if (error) {
        console.error('[v0] Contact submission error:', error)
        throw error
      }

      return NextResponse.json(
        { success: true, message: 'Contact form submitted successfully' },
        { status: 201 }
      )
    }

    if (type === 'feedback') {
      const { error } = await supabase.from('feedback_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          rating: formData.rating,
          message: formData.message,
        },
      ])

      if (error) {
        console.error('[v0] Feedback submission error:', error)
        throw error
      }

      return NextResponse.json(
        { success: true, message: 'Feedback form submitted successfully' },
        { status: 201 }
      )
    }

    if (type === 'inquiry') {
      const { error } = await supabase.from('product_inquiries').insert([
        {
          customer_name: formData.customerName,
          email: formData.email,
          country: formData.country,
          quantity: parseInt(formData.quantity),
          shipping_method: formData.shippingMethod,
          message: formData.message,
          product_id: formData.productId,
          product_name: formData.productName,
          product_price: formData.productPrice,
        },
      ])

      if (error) {
        console.error('[v0] Product inquiry error:', error)
        throw error
      }

      return NextResponse.json(
        { success: true, message: 'Product inquiry submitted successfully' },
        { status: 201 }
      )
    }

    return NextResponse.json(
      { error: 'Invalid form type' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('[v0] Form submission error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit form' },
      { status: 500 }
    )
  }
}
