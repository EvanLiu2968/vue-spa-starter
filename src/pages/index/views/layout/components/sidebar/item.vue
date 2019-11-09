<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          title: '',
          icon: ''
        }
      }
    }
  },
  render(h, context) {
    const { icon, title } = context.props.meta
    const vnodes = []

    if (icon) {
      const className = 'menu-icon ' + icon
      vnodes.push(<i class={className} />)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
