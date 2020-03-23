<?php

namespace App\Controller\Front;

use App\Entity\User;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Csrf\TokenStorage\TokenStorageInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @Route("/user", name="user_")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     */
    public function index(): Response
    {
        $users = $this->getDoctrine()
            ->getRepository(User::class)
            ->findAll();

        return $this->render('back/user/index.html.twig', [
            'users' => $users,
            'current_user' => $this->getUser()
        ]);
    }

    /**
     * @Route("/edit", name="edit", methods={"GET","POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param TranslatorInterface $translator
     * @return Response
     */
    public function edit(Request $request, UserPasswordEncoderInterface $passwordEncoder, TranslatorInterface $translator): Response
    {
        if (!$this->getUser()){
            return $this->redirectToRoute('security_login');
        }

        $user = new User();
        $user->setPassword($this->getUser()->getPassword());

        $form = $this->createForm(UserType::class, $this->getUser(), ['oldPassword' => true]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if ($form->getData()->getPlainPassword()){
                if (!$passwordEncoder->isPasswordValid($user, $form->getData()->getOldPassword())){
                    $this->addFlash('danger', $translator->trans('user.error.password'));
                    return $this->redirectToRoute('front_user_edit');
                }
            }

            $this->getDoctrine()->getManager()->flush();

            $this->addFlash('success', $translator->trans('flash.userUpdated'));

            return $this->redirectToRoute('front_user_edit');
        }

        return $this->render('front/user/edit.html.twig', [
            'user' => $this->getUser(),
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/delete", name="delete", methods={"DELETE"})
     * @param Request $request
     * @param TranslatorInterface $translator
     * @return Response
     */
    public function delete(Request $request, TranslatorInterface $translator): Response
    {
        /** @var User $user **/
        $user = $this->getUser();
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $user->setDeleted(true);
            $entityManager->flush();
            $this->addFlash('success', $translator->trans('flash.userDeleted'));
            return $this->redirectToRoute('security_logout');
        }else{
            $this->addFlash('danger', $translator->trans('flash.invalidToken'));
        }

        return $this->redirectToRoute('front_user_edit');
    }
}
