import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import HardBreak from '@tiptap/extension-hard-break'
import { lowlight } from 'lowlight/lib/common'

const sharedExtensions = () => [
  StarterKit.configure({
    codeBlock: false,
    heading: false,
    hardBreak: false
  }),
  Heading.configure({ levels: [2, 3, 4] }),
  Underline,
  Link.configure({
    openOnClick: true,
    autolink: true,
    HTMLAttributes: {
      class: 'text-[#A78BFA] underline underline-offset-4 transition hover:text-white'
    }
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'rounded-3xl border border-white/5 bg-[#0F0F16] object-cover shadow-[0_14px_45px_rgba(0,0,0,0.45)] my-8'
    }
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'javascript',
    HTMLAttributes: {
      class: 'rounded-2xl bg-[#0F0F16] border border-white/5 p-4 font-mono text-sm text-white overflow-auto'
    }
  }),
  HardBreak.configure({
    keepMarks: true
  })
]

export const getEditorExtensions = () => [
  ...sharedExtensions(),
  Placeholder.configure({
    placeholder: 'Write something memorable...'
  })
]

export const getRendererExtensions = () => sharedExtensions()

