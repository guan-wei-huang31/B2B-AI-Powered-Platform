import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router';
import remarkGfm from 'remark-gfm';

const internalBase: string = 'http://172.178.36.76:5000/';

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children, ...props }) => {
          if (href?.startsWith(internalBase)) {
            // Pick the path of the internal route, remove the prefix IP
            const path = href.replace(internalBase, '/');
            return (
              <NavLink to={path} {...props}>
                {children}
              </NavLink>
            );
          } else {
            // External link, open in new tab
            return (
              <a href={href} {...props} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          }
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
