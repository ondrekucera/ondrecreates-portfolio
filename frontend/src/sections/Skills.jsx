import { useLanguage } from '../hooks/useLanguage'
import { SECTION_IDS } from '../lib/constants'
import { skills } from '../data/skills'
import SectionWrapper from '../components/common/SectionWrapper'
import SectionHeading from '../components/common/SectionHeading'
import ScrollReveal from '../components/common/ScrollReveal'
import Badge from '../components/ui/Badge'

// Skupiny dovedností pro iteraci
const SKILL_GROUPS = ['frontend', 'backend', 'tools']

function Skills() {
  const { t } = useLanguage()

  return (
    <SectionWrapper id={SECTION_IDS.skills} className="bg-bg-surface/30">
      <ScrollReveal>
        <SectionHeading
          subtitle={t('skills.subtitle')}
          title={t('skills.title')}
          className="mb-16"
        />
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {SKILL_GROUPS.map((group, groupIndex) => (
          <ScrollReveal key={group} delay={groupIndex * 100}>
            <div className="space-y-5">
              {/* Nadpis skupiny */}
              <h3 className="text-sm font-mono font-medium text-text-muted uppercase tracking-widest">
                {t(`skills.categories.${group}`)}
              </h3>

              {/* Tech tagy */}
              <div className="flex flex-wrap gap-2">
                {skills[group].map(({ name, level }) => (
                  <Badge
                    key={name}
                    variant={level === 'primary' ? 'accent' : 'default'}
                  >
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  )
}

export default Skills
