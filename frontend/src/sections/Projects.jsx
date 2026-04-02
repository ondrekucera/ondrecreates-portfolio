import { useLanguage } from '../hooks/useLanguage'
import { SITE, SECTION_IDS } from '../lib/constants'
import { projects } from '../data/projects'
import SectionWrapper from '../components/common/SectionWrapper'
import SectionHeading from '../components/common/SectionHeading'
import ScrollReveal from '../components/common/ScrollReveal'
import ProjectCard from '../components/ui/ProjectCard'
import Button from '../components/ui/Button'

// ProjectCard extrahován do vlastního souboru:
// src/components/ui/ProjectCard.jsx
// STATUS_MAP přesunuto tam (patří k ProjectCard, ne k Projects)

function Projects() {
  const { t } = useLanguage()

  const featured = projects.filter((p) => p.featured)
  const rest      = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id={SECTION_IDS.projects}>

      <ScrollReveal>
        <SectionHeading
          subtitle={t('projects.subtitle')}
          title={t('projects.title')}
          className="mb-16"
        />
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
