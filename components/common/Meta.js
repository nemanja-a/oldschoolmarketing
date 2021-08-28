import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width,initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Old School Marketing',
    keywords: 'marketing, advertising, websites, chalkboard ',
    description: 'Inovative, easy to use and simplified way of internet marketing.'
}

export default Meta