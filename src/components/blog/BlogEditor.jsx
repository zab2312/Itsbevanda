import { useEffect, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { Bold, Heading2, Image as ImageIcon, Italic, LinkIcon, List, ListOrdered, Minus, Quote, Underline as UnderlineIcon } from 'lucide-react'
import { getEditorExtensions } from './extensions'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { uploadCoverImage, uploadInlineImage } from '../../services/blogService'

const normalizeContent = (value) => {
  if (!value) return ''
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (error) {
      return ''
    }
  }
  return value
}

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')

const MenuButton = ({ icon: Icon, label, active, disabled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/70 transition hover:text-white ${
      active ? 'bg-white/10 text-white' : 'bg-transparent'
    } disabled:opacity-40 disabled:cursor-not-allowed`}
    title={label}
    aria-label={label}
  >
    <Icon className="h-4 w-4" />
  </button>
)

export function BlogEditor({ initialData = {}, onSubmit, submitting = false, mode = 'create' }) {
  const [formState, setFormState] = useState({
    title: initialData.title || '',
    slug: initialData.slug || '',
    excerpt: initialData.excerpt || '',
    cover_image: initialData.cover_image || '',
    published: initialData.published || false,
    images: initialData.images || [],
    content: normalizeContent(initialData.content) || null
  })
  const [feedback, setFeedback] = useState('')
  const [coverUploading, setCoverUploading] = useState(false)
  const [inlineUploading, setInlineUploading] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(initialData.slug))

  const coverInputRef = useRef(null)
  const inlineInputRef = useRef(null)

  const editor = useEditor({
    extensions: getEditorExtensions(),
    content: normalizeContent(initialData.content) || '',
    autofocus: false,
    editorProps: {
      attributes: {
        class: 'tiptap focus-visible:outline-none'
      }
    },
    onUpdate: ({ editor }) => {
      setFormState((prev) => ({
        ...prev,
        content: editor.getJSON()
      }))
    }
  })

  useEffect(() => {
    setFormState({
      title: initialData.title || '',
      slug: initialData.slug || '',
      excerpt: initialData.excerpt || '',
      cover_image: initialData.cover_image || '',
      published: initialData.published || false,
      images: initialData.images || [],
      content: normalizeContent(initialData.content) || null
    })
    if (initialData.content && editor) {
      editor.commands.setContent(normalizeContent(initialData.content) || '')
    }
  }, [initialData, editor])

  const handleTitleChange = (value) => {
    setFormState((prev) => ({ ...prev, title: value }))
    if (!slugManuallyEdited) {
      setFormState((prev) => ({ ...prev, slug: slugify(value) }))
    }
  }

  const handleInlineUpload = async (file) => {
    try {
      setInlineUploading(true)
      const { url } = await uploadInlineImage(file)
      if (editor) {
        editor.chain().focus().setImage({ src: url, alt: file.name }).run()
      }
      setFormState((prev) => ({
        ...prev,
        images: [...(prev.images || []), url]
      }))
      setFeedback('Image uploaded')
      setTimeout(() => setFeedback(''), 3000)
    } catch (error) {
      setFeedback(error.message)
    } finally {
      setInlineUploading(false)
    }
  }

  const handleCoverUpload = async (file) => {
    try {
      setCoverUploading(true)
      const { url } = await uploadCoverImage(file)
      setFormState((prev) => ({ ...prev, cover_image: url }))
      setFeedback('Cover uploaded')
      setTimeout(() => setFeedback(''), 3000)
    } catch (error) {
      setFeedback(error.message)
    } finally {
      setCoverUploading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formState.title || !formState.slug) {
      setFeedback('Title and slug are required.')
      return
    }

    const payload = {
      title: formState.title,
      slug: formState.slug,
      excerpt: formState.excerpt,
      cover_image: formState.cover_image || null,
      published: formState.published,
      images: formState.images || [],
      content: formState.content || editor?.getJSON()
    }

    onSubmit(payload)
  }

  const addLink = () => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link')?.href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  const toolbarButtons = [
    {
      icon: Bold,
      label: 'Bold',
      action: () => {
        if (!editor) return
        editor.chain().focus().toggleBold().run()
      },
      isActive: !!editor?.isActive('bold')
    },
    {
      icon: Italic,
      label: 'Italic',
      action: () => {
        if (!editor) return
        editor.chain().focus().toggleItalic().run()
      },
      isActive: !!editor?.isActive('italic')
    },
    {
      icon: UnderlineIcon,
      label: 'Underline',
      action: () => {
        if (!editor) return
        editor.chain().focus().toggleUnderline().run()
      },
      isActive: !!editor?.isActive('underline')
    },
    {
      icon: Heading2,
      label: 'Heading',
      action: () => {
        if (!editor) return
        editor.chain().focus().toggleHeading({ level: 2 }).run()
      },
      isActive: !!editor?.isActive('heading', { level: 2 })
    },
    {
      icon: List,
      label: 'Bullet List',
      action: () => {
        if (!editor) return
        editor.chain().focus().toggleBulletList().run()
      },
      isActive: !!editor?.isActive('bulletList')
    },
    {
      icon: ListOrdered,
      label: 'Ordered List',
      action: () => {
        if (!editor) return
        editor.chain().focus().toggleOrderedList().run()
      },
      isActive: !!editor?.isActive('orderedList')
    },
    {
      icon: Quote,
      label: 'Quote',
      action: () => {
        if (!editor) return
        editor.chain().focus().toggleBlockquote().run()
      },
      isActive: !!editor?.isActive('blockquote')
    },
    {
      icon: Minus,
      label: 'Horizontal Rule',
      action: () => {
        if (!editor) return
        editor.chain().focus().setHorizontalRule().run()
      },
      isActive: false
    }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={formState.title} onChange={(event) => handleTitleChange(event.target.value)} placeholder="Write an inspiring title" required />
        </div>
        <div className="space-y-4">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formState.slug}
            onChange={(event) => {
              setSlugManuallyEdited(true)
              setFormState((prev) => ({ ...prev, slug: slugify(event.target.value) }))
            }}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          rows={3}
          value={formState.excerpt}
          onChange={(event) => setFormState((prev) => ({ ...prev, excerpt: event.target.value }))}
          placeholder="Summarize the main idea in a couple of sentences."
        />
      </div>

      <div className="space-y-4">
        <Label>Cover Image</Label>
        <div className="rounded-3xl border border-dashed border-white/10 bg-[#15141B] p-6">
          {formState.cover_image ? (
            <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/10">
              <img src={formState.cover_image} alt="Cover" className="h-64 w-full object-cover" />
            </div>
          ) : (
            <p className="text-sm text-white/40 mb-4">Upload a 1600x900px cover image.</p>
          )}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) handleCoverUpload(file)
              event.target.value = ''
            }}
          />
          <Button type="button" disabled={coverUploading} onClick={() => coverInputRef.current?.click()}>
            {coverUploading ? 'Uploading...' : formState.cover_image ? 'Replace cover' : 'Upload cover'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Content</Label>
        <div className="rounded-3xl border border-white/10 bg-[#15141B]">
          <div className="flex flex-wrap gap-2 border-b border-white/5 px-4 py-3">
            {toolbarButtons.map((button) => (
              <MenuButton
                key={button.label}
                icon={button.icon}
                label={button.label}
                active={button.isActive}
                disabled={!editor}
                onClick={button.action}
              />
            ))}
            <MenuButton
              icon={LinkIcon}
              label="Link"
              disabled={!editor}
              active={!!editor?.isActive('link')}
              onClick={addLink}
            />
            <MenuButton
              icon={ImageIcon}
              label="Image"
              disabled={!editor || inlineUploading}
              active={false}
              onClick={() => inlineInputRef.current?.click()}
            />
          </div>
          <div className="p-6">
            <EditorContent editor={editor} />
          </div>
        </div>
        <input
          ref={inlineInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) handleInlineUpload(file)
            event.target.value = ''
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-white/5 bg-[#181820] px-4 py-3">
        <div className="flex items-center gap-3">
          <Switch checked={formState.published} onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, published: checked }))} />
          <div>
            <p className="text-white font-medium">{formState.published ? 'Published' : 'Draft'}</p>
            <p className="text-xs text-white/50">Toggles the public visibility.</p>
          </div>
        </div>
      </div>

      {feedback ? <p className="text-sm text-[#C4B5FD]">{feedback}</p> : null}

      <div className="flex flex-wrap gap-4">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : mode === 'create' ? 'Publish Post' : 'Save changes'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (!editor) return
            editor.chain().focus().clearContent().run()
          }}
        >
          Clear content
        </Button>
      </div>
    </form>
  )
}

