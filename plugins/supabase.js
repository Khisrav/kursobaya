import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://jecrgueyhwlfkfkmznzp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplY3JndWV5aHdsZmtma216bnpwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzEzNTIyNiwiZXhwIjoyMDQ4NzExMjI2fQ.1njpyx_YGEXp7pqyrbCS5aWU3Kpz5W-TM5IOvwmuNLw'

const supabase = createClient(supabaseUrl, supabaseKey)

export default defineNuxtPlugin(() => {
    return {
        provide: {
            supabase
        }
    }
})