import ParallaxEffect from '@/components/home/Parllax'
import Footer from '../components/home/Footer'
import ScrollTextReveal from '@/components/home/ScrollTextReveal'
import Card from '@/components/home/ScrollShowcase'

const Home = () => {
    return (
        <>
            <ParallaxEffect />
            <ScrollTextReveal />
            <Card />
            <Footer />
        </>
    )
}

export default Home