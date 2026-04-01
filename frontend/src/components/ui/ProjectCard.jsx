// ─── ProjectCard ──────────────────────────────────────────────────────────────
//
// Extrahováno z Projects.jsx (byl definován uvnitř komponenty).
// Výhody: testovatelný samostatně, snazší refaktor, čistší Projects.jsx.
// ─────────────────────────────────────────────────────────────────────────────

import { useLanguage } from '../../hooks/useLanguage'
import ScrollReveal from '../common/ScrollReveal'
import Card from './Card'
import Badge from './Badge'
import Button from './Button'

// Mapování statusu → Badge varianta + překladový klíč
// Extrahováno sem spolu s komponentou (dříve bylo v Projects.jsx)
const STATUS_MAP = {
  live:          { variant: 'live',    key: 'projects.status_live' },
  'in-progress': { variant: 'wip',     key: 'projects.status_wip'  },
  'coming-soon': { variant: 'soon',    key: 'projects.coming_soon' },
}

function ProjectCard({ project, index }) {
  const { t, lang } = useLanguage()
  const status        = STATUS_MAP[project.status] ?? STATUS_MAP['coming-soon']
  const isFeatured    = project.featured
  const isPlaceholder = project.status === 'coming-soon'

  return (
    <ScrollReveal delay={index * 100}>
      <Card featured={isFeatured} className="p-6 h-full flex flex-col gap-5">

        {/* Hlavička – název + status badge */}
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-bold text-text-primary ${isFeatured ? 'text-xl' : 'text-lg'}`}>
            {project.title}
          </h3>
          <Badge variant={status.variant}>{t(status.key)}</Badge>
        </div>

        {/* Popis */}
        <p className={`text-text-secondary leading-relaxed flex-1 ${isPlaceholder ? 'opacity-50' : ''}`}>
          {project.description[lang] ?? project.description.cs}
        </p>

        {/* Tech stack */}
        {!isPlaceholder && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        )}

        {/* Akce – GitHub / Demo */}
        {!isPlaceholder && (project.githubUrl || project.demoUrl) && (
          <div className="flex gap-3 pt-1">
            {project.githubUrl && (
              <Button variant="ghost" size="sm" href={project.githubUrl} external>
                {t('projects.github_label')}
                <span aria-hidden="true" className="text-text-muted">↗</span>
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="outline" size="sm" href={project.demoUrl} external>
                {t('projects.demo_label')}
                <span aria-hidden="true">↗</span>
              </Button>
            )}
          </div>
        )}

      </Card>
    </ScrollReveal>
  )
}

export default ProjectCard
