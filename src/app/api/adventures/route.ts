import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: adventures, error } = await supabase
      .from('Adventure')
      .select(`
        *,
        nodes:AdventureNode (
          *,
          choices:Choice (*)
        )
      `)

    if (error) throw error
    return NextResponse.json(adventures)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch adventures' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Start a transaction
    const { data: adventure, error: adventureError } = await supabase
      .from('Adventure')
      .insert({
        title: data.title,
        startNodeId: data.startNodeId,
      })
      .select()
      .single()

    if (adventureError) throw adventureError

    // Create nodes
    const nodes = data.nodes.map((node: any) => ({
      ...node,
      adventureId: adventure.id,
      choices: node.choices || []
    }))

    const { data: createdNodes, error: nodesError } = await supabase
      .from('AdventureNode')
      .insert(nodes.map(({ choices, ...node }: any) => node))
      .select()

    if (nodesError) throw nodesError

    // Create choices
    const choices = nodes.flatMap((node: any, index: number) =>
      node.choices.map((choice: any) => ({
        ...choice,
        nodeId: createdNodes[index].id
      }))
    )

    if (choices.length > 0) {
      const { error: choicesError } = await supabase
        .from('Choice')
        .insert(choices)

      if (choicesError) throw choicesError
    }

    // Fetch the complete adventure with all relations
    const { data: completeAdventure, error: fetchError } = await supabase
      .from('Adventure')
      .select(`
        *,
        nodes:AdventureNode (
          *,
          choices:Choice (*)
        )
      `)
      .eq('id', adventure.id)
      .single()

    if (fetchError) throw fetchError

    return NextResponse.json(completeAdventure)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create adventure' }, { status: 500 })
  }
} 