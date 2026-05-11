import * as LR from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function DeploymentSection() {
  const t = useTranslations('HomePage.deployment')
  const plans = [
    {
      name: t('selfHosted.name'),
      price: t('selfHosted.price'),
      description: t('selfHosted.description'),
      features: [
        t('selfHosted.feature1'),
        t('selfHosted.feature2'),
        t('selfHosted.feature3'),
        t('selfHosted.feature4'),
      ],
      cta: t('selfHosted.cta'),
      icon: <LR.Users className="w-8 h-8 text-primary-light" />,
    },
    {
      name: t('cdtHosted.name'),
      price: t('cdtHosted.price'),
      description: t('cdtHosted.description'),
      features: [
        t('cdtHosted.feature1'),
        t('cdtHosted.feature2'),
        t('cdtHosted.feature3'),
        t('cdtHosted.feature4'),
        t('cdtHosted.feature5'),
        t('cdtHosted.feature6'),
      ],
      cta: t('cdtHosted.cta'),
      icon: <img src='/images/homepage/cdt-logo-white.svg' className='w-8 h-8' alt="CDT" />,
    },
  ]

  return (
    <section id="deployment" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="leading-tight font-normal text-primary-light text-2xl my-12">
            {t('deployment')}
          </p>
          <p className="text-xl text-primary-light max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="relative bg-opacity-0 backdrop-blur-sm border-border hover:scale-[103%] transition-transform flex flex-col cursor-pointer"
            >
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="text-primary-light">{plan.icon}</div>
                </div>

                <CardTitle className="text-2xl font-bold text-primary-light">
                  {plan.name}
                </CardTitle>

                <div className="mt-4">
                  <span className="text-xl font-normal text-primary-light">{plan.price}</span>
                </div>

                <CardDescription className="mt-2 font-light text-primary-light">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow space-y-6">
                <div className="flex flex-col space-y-3 flex-grow justify-center my-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <LR.Check className="w-5 h-5 text-primary-light flex-shrink-0" />
                      <span className="text-primary-light text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
