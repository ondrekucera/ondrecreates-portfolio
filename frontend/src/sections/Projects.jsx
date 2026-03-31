import { useLanguage } from '../hooks/useLanguage'
import { SITE, SECTION_IDS } from '../lib/constants'
import { projects } from '../data/projects'
import SectionWrapper from '../components/common/SectionWrapper'
import ScrollReveal from '../components/common/ScrollReveal'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

// Mapování statusu projektu na Badge variantu a překladový klíč
const STATUS_MAP = {
  live: { variant: 'live', key: 'projects.status_live' },
  'in-progress': { variant: 'wip', key: 'projects.status_wip' },
  'coming-soon': { variant: 'soon', key: 'projects.coming_soon' },
}

function ProjectCard({ project, index }) {
  const { t, lang } = useLanguage()
  const status = STATUS_MAP[project.status] ?? STATUS_MAP['coming-soon']
  const isFeatured = project.featured
  const isPlaceholder = project.status === 'coming-soon'

  return (
    <ScrollReveal delay={index * 100}>
      <Card featured={isFeatured} className="p-6 h-full flex flex-col gap-5">
        {/* Hlavička karty */}
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

        {/* Akce */}
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

function Projects() {
  const { t } = useLanguage()

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id={SECTION_IDS.projects}>
      <ScrollReveal>
        <div className="space-y-2 mb-16">
          <p className="text-xs font-mono text-accent tracking-widest uppercase">
            {t('projects.subtitle')}
          </p>
          <h2 className="text-4xl font-bold text-text-primary">
            {t('projects.title')}
          </h2>
        </div>
      </ScrollReveal>

      {/* Hlavní projekt – zvýrazněný */}
      {featured.length > 0 && (
        <div className="mb-8">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}

      {/* Ostatní projekty */}
      <div className="grid sm:grid-cols-2 gap-6">
        {rest.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i + featured.length} />
        ))}
      </div>

      {/* GitHub link */}
      <ScrollReveal delay={300}>
        <div className="mt-12 text-center">
          <Button variant="ghost" href={SITE.github} external>
            {t('projects.view_all')}
            <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  )
}

export default Projects
