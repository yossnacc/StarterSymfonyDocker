<?php
namespace App\Controller\Back;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class IndexController
 * @package App\Controller\Back
 */
class IndexController extends AbstractController
{
    /**
     * @Route("/",name="index", methods={"GET"})
     */
    public function index():Response
    {
        return $this->render('back/index.html.twig');
    }
}