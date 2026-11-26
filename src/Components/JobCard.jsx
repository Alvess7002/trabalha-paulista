import { Briefcase, CalendarDays, MapPin } from 'lucide-react'
import InfoCard from './InfoCard'
import FavoriteButton from './FavoriteButton'
import ShareButton from './ShareButton'
import { useFeatures } from '../hooks/useFeatures'
import { ageInDays, formatDate } from '../utils/dates'

export default function JobCard({ job: raw }) {
  const { t, tr, label, lang } = useFeatures()
  const job = tr('jobs', raw)
  const dateText =
    ageInDays(job.publicadaEm) === 0
      ? t('job.today')
      : t('job.published', { date: formatDate(job.publicadaEm, lang) })

  return (
    <InfoCard icon={Briefcase} badge={label('tipo', job.tipo)} title={job.cargo} subtitle={job.empresa}
      meta={job.local} metaIcon={MapPin} description={job.descricao}
      footer={
        <>
          <span className="card-date"><CalendarDays size={15} aria-hidden="true" /> {dateText}</span>
          <span className="card-actions">
            <ShareButton job={raw} />
            <FavoriteButton type="jobs" id={job.id} />
          </span>
        </>
      } />
  )
}
